
export type DisableReelOptions = '10 mins.' | '30 mins.' | '1 hour' | '2 hours' | '4 hours' | '8 hours' | 'forever' | '';

export interface Quote {
    id: string;
    quote: string;
    author: string;
}