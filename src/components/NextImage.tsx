import type { ImageProps } from 'next/image';
import Image from 'next/image';

export type NextImageProps = ImageProps & {};

export default function NextImage({ alt = 'No alt', ...props }: NextImageProps) {
  if (
    props.layout !== 'fill' &&
    (props.width === null ||
      props.width === undefined ||
      props.width === 'auto' ||
      props.height === null ||
      props.height === undefined ||
      props.height === 'auto')
  ) {
    return (
      <div style={{ width: '100%', height: '100%', position: 'relative' }}>
        <Image layout="fill" objectFit="contain" alt={alt} {...props} />
      </div>
    );
  }

  return <Image alt={alt} {...props} />;
}
