import { Certificate } from "crypto";
import { CERTIFICATE_REPOSITORY } from "src/core/constants";


export const CertificateProviders =[
    {
        provide:CERTIFICATE_REPOSITORY,
        useValue:Certificate,
    }
];