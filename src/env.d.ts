declare global {
  interface ImportMeta {
    hot: boolean;
  }

  interface Window {
    MonacoEnvironment: {
      getWorker: (workerId: string, label: string) => string;
    };
  }
}

export {};
