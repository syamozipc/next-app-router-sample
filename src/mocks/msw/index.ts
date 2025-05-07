export async function initMocks() {
  if (typeof window === 'undefined') {
    const { server } = await import('@/mocks/msw/server');
    server.listen();
  } else {
    const { worker } = await import('@/mocks/msw/browser');
    worker.start();
  }
}
