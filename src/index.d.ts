import { FontFaceConfig } from '@font-face/core';

export type FontFaceNodeConfig = {
    input: {
        dir: string
    },
    output: {
        dir: string;
        resourceDir: string;
        cssFileName: string;
    }
    fonts: FontFaceConfig[];
};
