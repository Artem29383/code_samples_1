export default (link: string) =>
  /^https?:\/\//.test(link) || link.startsWith('mailto:');
