if (process.env.NODE_ENV === 'development') {
  (window as any).remote_host1 = `${process.env.remote_host1}/assets/remoteEntry.js`;
  (window as any).remote_host2 = `${process.env.remote_host2}/assets/remoteEntry.js`;
}
