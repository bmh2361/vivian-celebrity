import { useState } from 'react';
import { localizedMediaText } from './caseStudyUtils.js';

export default function ProjectImage(props) {
  return <ImageContent key={props.image?.src || 'missing'} {...props} />;
}

function ImageContent({ image, lang, withBase, className = '', fallbackClassName = '', loading = 'lazy', usage }) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const src = image?.src ? withBase(image.src) : '';
  const display = image?.display?.[usage];

  if (!src || failed) {
    return (
      <div className={`grid place-items-center bg-[#fbfaf7] text-center text-xs text-[#888] ${fallbackClassName || className}`} role="img" aria-label={lang === 'zh' ? '项目图片暂不可用' : 'Project image unavailable'}>
        {lang === 'zh' ? '图片暂不可用' : 'Image unavailable'}
      </div>
    );
  }

  const element = (
    <img
      src={src}
      alt={localizedMediaText(image, 'alt', lang)}
      width={image.width || undefined}
      height={image.height || undefined}
      className={className}
      data-loaded={loaded ? 'true' : 'false'}
      style={{ objectPosition: display?.position || image.focalPoint || 'center', aspectRatio: display?.ratio, objectFit: display?.fit, ...(usage === 'preview' ? { opacity: loaded ? 1 : 0 } : {}) }}
      loading={loading}
      decoding="async"
      onLoad={() => setLoaded(true)}
      onError={() => setFailed(true)}
    />
  );

  if (!image.sources?.length) return element;
  return (
    <picture className="block">
      {image.sources.map((source) => (
        <source key={`${source.media || 'all'}-${source.type || 'auto'}-${source.srcSet}`} media={source.media} type={source.type} srcSet={withBase(source.srcSet)} />
      ))}
      {element}
    </picture>
  );
}
