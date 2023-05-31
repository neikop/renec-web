import { DateTime } from 'luxon';

export const formatNumber = (number?: number) => {
  return Number(number ?? 0).toLocaleString();
};

const units: Intl.RelativeTimeFormatUnit[] = ['year', 'month', 'week', 'day', 'hour', 'minute', 'second'];

export const timeAgo = (dateTime: DateTime) => {
  const diff = dateTime.diffNow().shiftTo(...units);
  const unit = units.find((unit) => diff.get(unit) !== 0) || 'second';

  const relativeFormatter = new Intl.RelativeTimeFormat('en', {
    numeric: 'auto',
  });
  return relativeFormatter.format(Math.trunc(diff.as(unit)), unit);
};

const loremIpsums = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vitae nulla fermentum, fermentum neque a, venenatis ante. Ut neque magna, molestie id ipsum quis, bibendum venenatis sapien. Nunc vel feugiat eros. Praesent sagittis faucibus urna, at tempus lorem. Nullam semper suscipit est vitae porta. Quisque nisi justo, tristique vitae eleifend non, dignissim eget augue. Fusce bibendum aliquet lorem ut maximus. Mauris placerat massa id interdum tristique. Cras posuere, leo vitae malesuada rutrum, libero erat vestibulum nibh, ac tristique libero turpis nec dolor. Proin pharetra tellus a mattis venenatis. Pellentesque ornare quam quis pellentesque lacinia. Phasellus nisl mauris, faucibus eu ullamcorper maximus, elementum at est. Sed eu suscipit ipsum. Suspendisse imperdiet nibh vestibulum justo sodales, sit amet pretium turpis fringilla. Cras ut purus in est vulputate laoreet quis at velit. In sollicitudin sodales libero, ut tristique neque dictum et.`,
  `Sed dictum hendrerit feugiat. Donec eget ipsum vel elit gravida varius sit amet non ligula. Suspendisse aliquam a nibh at convallis. Ut dictum imperdiet nisi, et vehicula lorem. Proin in sapien urna. Proin rutrum finibus imperdiet. Fusce congue lobortis arcu. Curabitur vel sodales neque. Fusce vitae ipsum cursus, tristique purus ut, sollicitudin diam. Etiam ac tellus sed ligula tempor fermentum at vitae nisi.`,
  `Nam sit amet augue tempor, cursus dui sed, suscipit diam. Curabitur tortor tellus, pellentesque nec tellus quis, semper sollicitudin neque. Nullam fringilla non enim ut sodales. Praesent cursus urna in auctor tincidunt. Donec at laoreet mauris, vel varius erat. Nunc sed tempor nisl, sed volutpat arcu. Nullam porttitor feugiat mauris, in elementum est mattis in. Praesent suscipit gravida metus, quis vestibulum sapien accumsan sed. Sed et ultrices lectus.`,
  `Cras aliquet ac arcu suscipit elementum. Praesent vel gravida massa. Aenean luctus semper ligula, suscipit tincidunt odio finibus in. Suspendisse sapien sem, cursus sit amet imperdiet sit amet, lacinia sed est. Phasellus vestibulum mauris quis luctus laoreet. Praesent sit amet gravida magna. In mauris tortor, lobortis sit amet lectus non, maximus rutrum leo. Maecenas eu risus nec ligula aliquam auctor. Maecenas quis maximus sapien. Proin non consequat elit. Donec quis sem viverra mi auctor placerat. Nulla maximus ipsum lorem, sit amet pretium justo cursus vel. Curabitur quis consectetur tortor.`,
  `Mauris purus nisi, condimentum cursus urna convallis, auctor varius elit. Sed pulvinar mauris a congue vestibulum. Nam porttitor metus ut eros elementum, nec sodales arcu ullamcorper. Nullam placerat ut diam a dignissim. Fusce ut sodales ante, vel volutpat urna. In neque augue, vestibulum ut aliquet ac, efficitur et nisl. Praesent scelerisque mauris nec pellentesque facilisis. Sed at accumsan sem. Aenean imperdiet turpis ut risus accumsan sagittis. Pellentesque massa tortor, ornare ac sagittis at, gravida quis justo. Cras vel neque sed justo lacinia laoreet id sed lacus. Nulla facilisi.`,
];

export const generateDescription = () => {
  return loremIpsums[Math.floor(Math.random() * loremIpsums.length)];
};
