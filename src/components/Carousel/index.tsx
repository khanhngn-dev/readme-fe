import useEmblaCarousel from 'embla-carousel-react';
import mergeRefs from 'merge-refs';
import { forwardRef, useEffect, useState } from 'react';

import { cn } from '@/lib/cn';

type CarouselProps = React.HTMLAttributes<HTMLDivElement> & {
  slides?: React.ReactNode[];
  options?: Parameters<typeof useEmblaCarousel>[0];
  gap?: number;
  showDot?: boolean;
};

const Carousel = forwardRef<HTMLDivElement, CarouselProps>(
  (
    {
      options,
      slides = [],
      gap = 20,
      className,
      style,
      showDot = false,
      ...props
    },
    ref,
  ) => {
    const [carouselRef, carouselApi] = useEmblaCarousel(options);
    const [selectedIndex, setSelectedIndex] = useState(
      options?.startIndex || 0,
    );

    const isVertical = options?.axis === 'y';

    const variables: React.CSSProperties = {
      '--carousel-gap': `${gap}px`,
    } as Record<string, number | string>;

    useEffect(() => {
      if (!carouselApi) return;

      const onSelect = () => {
        setSelectedIndex(carouselApi.selectedScrollSnap());
      };

      carouselApi.on('select', onSelect);
    }, [carouselApi]);

    return (
      <div
        className={cn('embla h-full overflow-clip relative', className)}
        ref={mergeRefs<HTMLDivElement>(carouselRef, ref)}
        style={{
          ...style,
          ...variables,
        }}
        {...props}
      >
        <div
          className={cn(
            'embla__container flex w-full h-full',
            isVertical ? 'flex-col' : 'flex-row',
            'gap-[var(--carousel-gap)]',
          )}
        >
          {slides.map((slide, index) => (
            <div
              className={cn(
                'embla__slide flex-grow-0 flex-shrink-0 basis-full',
                isVertical ? 'min-h-0' : 'min-w-0',
              )}
              key={index}
            >
              {slide}
            </div>
          ))}
        </div>
        {showDot && (
          <div
            className={cn(
              'flex gap-3 absolute justify-center items-center',
              isVertical
                ? 'flex-col right-1 inset-y-0 '
                : 'flex-row bottom-1 inset-x-0',
            )}
          >
            {slides.map((_, index) => (
              <Dot
                key={index}
                active={index === selectedIndex}
                onClick={() => carouselApi?.scrollTo(index)}
                isVertical={isVertical}
              />
            ))}
          </div>
        )}
      </div>
    );
  },
);

type DotProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  active?: boolean;
  isVertical?: boolean;
};

const Dot: React.FC<DotProps> = ({
  active,
  isVertical,
  className,
  ...props
}) => {
  return (
    <button
      className={cn(
        'bg-blue9/10 transition-colors hover:bg-blue9/50 rounded-full disabled:bg-black/20',
        isVertical ? 'w-1.5 h-6' : 'h-1.5 w-6',
        active && 'bg-blue9',
        className,
      )}
      {...props}
    />
  );
};

export default Carousel;
