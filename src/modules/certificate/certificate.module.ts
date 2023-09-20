import { Module } from "@nestjs/common";
import { Model } from "sequelize";
import { CertificateService } from "./certificate.service";
import { CertificateProviders } from "./certificate.providers";
import { CertificateController } from "./certificate.controller";



@Module({
    providers:[CertificateService, ...CertificateProviders],
    exports:[CertificateService],
    controllers:[CertificateController]
})
export class CertificateModule{}