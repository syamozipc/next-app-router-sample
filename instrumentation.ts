export async function register() {
  if (process.env.APP_ENV !== 'mock') return;

  // "msw/node"がNode.jsランタイムでのみ利用可能（=Edgeランタイムで利用不可）
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { initMocks } = await import('@/mocks/msw');
    initMocks();
  }
}
