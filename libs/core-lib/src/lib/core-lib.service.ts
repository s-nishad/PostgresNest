import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class CoreLibService {

    async hashPassword(password: string): Promise<string> {
        const saltRounds = Number(process.env['BCRYPT_SALT_ROUNDS']) || 10;
        return await bcrypt.hash(password, saltRounds);
    }

    async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(password, hashedPassword);
    }

    generateToken(payload: any): string {
        const jwt_secret = process.env['JWT_SECRET'] || "JWT_SECRET"
        return jwt.sign(payload, jwt_secret, { expiresIn: '1h' });
    }

    verifyToken(token: string): any {
        try {
            const jwt_secret = process.env['JWT_SECRET'] || "JWT_SECRET"
            return jwt.verify(token, jwt_secret);
        } catch (e) {
            return null;
        }
    }

}
