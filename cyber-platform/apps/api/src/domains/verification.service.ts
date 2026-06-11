import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as dns from 'dns/promises';

@Injectable()
export class DomainVerificationService {
  constructor(private prisma: PrismaService) {}

  /**
   * Generates a unique verification token for the domain.
   */
  async generateToken(domainId: string) {
    const token = `aegis-site-verification=${Math.random().toString(36).substring(2, 15)}`;
    return this.prisma.domain.update({
      where: { id: domainId },
      data: { verificationToken: token },
    });
  }

  /**
   * Performs the actual ownership check via DNS TXT records.
   */
  async verifyViaDns(domainId: string) {
    const domain = await this.prisma.domain.findUnique({ where: { id: domainId } });
    if (!domain) throw new BadRequestException('Domain not found');

    try {
      const records = await dns.resolveTxt(domain.hostname);
      const isVerified = records.flat().some(r => r.includes(domain.verificationToken));

      if (isVerified) {
        await this.prisma.domain.update({
          where: { id: domainId },
          data: { isVerified: true },
        });
        return { success: true, message: 'Domain ownership verified successfully.' };
      }
      
      return { success: false, message: 'Verification record not found. Please ensure the TXT record is propagated.' };
    } catch (error) {
      return { success: false, message: 'DNS resolution failed. Please check your domain settings.' };
    }
  }

  /**
   * Secondary verification via HTTP file upload.
   */
  async verifyViaHttp(domainId: string) {
    const domain = await this.prisma.domain.findUnique({ where: { id: domainId } });
    const url = `http://${domain.hostname}/.well-known/aegis-verification.txt`;

    try {
      const response = await fetch(url);
      const content = await response.text();
      
      if (content.trim() === domain.verificationToken) {
        await this.prisma.domain.update({
          where: { id: domainId },
          data: { isVerified: true },
        });
        return { success: true };
      }
    } catch (e) {
      return { success: false };
    }
  }
}
