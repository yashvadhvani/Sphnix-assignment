// custom.d.ts

declare global {
  interface Window {
    ethereum?: Ethereum | undefined;
  }
}

// Example interface for the Ethereum object
interface Ethereum {
  enable: () => Promise<void>;
  request: (args: { method: string }) => Promise<unknown>;
  // Add more properties and methods as needed based on the Ethereum object's structure
}

export {}; // Ensure this file is treated as a module
