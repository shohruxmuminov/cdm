import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import PDFDocument from 'pdfkit';

@Injectable()
export class EnterpriseReportService {
  constructor(private prisma: PrismaService) {}

  async generateExecutiveReport(scanId: string): Promise<Buffer> {
    const scan = await this.prisma.scan.findUnique({
      where: { id: scanId },
      include: { domain: true, findings: true, organization: true }
    });

    return new Promise((resolve) => {
      const doc = new PDFDocument({ margin: 50, size: 'A4' });
      const buffers: Buffer[] = [];

      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => resolve(Buffer.concat(buffers)));

      // --- Brand Header ---
      doc.rect(0, 0, 600, 80).fill('#020617');
      doc.fillColor('#22d3ee').fontSize(24).text('AEGIS CYBER-CORE', 50, 30);
      doc.fillColor('#ffffff').fontSize(10).text('EXECUTIVE SECURITY ASSESSMENT', 400, 35);

      // --- Summary Section ---
      doc.moveDown(4);
      doc.fillColor('#000000').fontSize(18).text(`Assessment Report: ${scan.domain.hostname}`);
      doc.fontSize(10).text(`Generated for: ${scan.organization.name} | Date: ${new Date().toLocaleDateString()}`);
      
      doc.moveDown(2);
      doc.fontSize(14).text('Executive Summary', { underline: true });
      doc.fontSize(11).text(
        `During the automated security assessment of ${scan.domain.hostname}, our engine identified ${scan.findings.length} security findings. ` +
        `The calculated risk score is ${scan.riskScore}/100, placing the organization in the ${scan.riskScore > 70 ? 'CRITICAL' : 'STABLE'} tier.`
      );

      // --- Findings Table ---
      doc.moveDown(2);
      this.drawTable(doc, scan.findings);

      // --- Footer ---
      doc.fontSize(8).fillColor('#666666').text('Confidential - Authorized Access Only', 50, 750, { align: 'center' });

      doc.end();
    });
  }

  private drawTable(doc: any, findings: any[]) {
    const tableTop = 300;
    doc.fontSize(10).text('ID', 50, tableTop);
    doc.text('Severity', 100, tableTop);
    doc.text('Vulnerability', 180, tableTop);
    doc.text('Status', 450, tableTop);

    findings.forEach((f, i) => {
      const y = tableTop + 25 + (i * 20);
      doc.text(i + 1, 50, y);
      doc.fillColor(f.severity === 'CRITICAL' ? '#ff0000' : '#000000').text(f.severity, 100, y);
      doc.fillColor('#000000').text(f.title.substring(0, 40), 180, y);
      doc.text(f.status, 450, y);
    });
  }
}
