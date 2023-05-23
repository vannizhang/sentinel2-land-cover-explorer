import React from 'react';

declare global {
    namespace JSX {
        export interface IntrinsicElements {
            'calcite-loader': any;
            'calcite-input-text': any;
            'calcite-input-area': any;
            'calcite-button': any;
        }
    }
}
