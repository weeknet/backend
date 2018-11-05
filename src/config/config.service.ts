import { Injectable } from "@nestjs/common";
import { InjectConfig } from 'nestjs-config';

@Injectable()
export class ConfigService {

    constructor(@InjectConfig() private readonly config) {
        
    }

    getPort() : Number {
        return this.config.get('express.port');
    }

}