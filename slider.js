  const { useState } = React;
    const { createRoot } = ReactDOM;

    let goToSlideExternally = null;

    function Slider() {
      const slides = ['about', 'mental', 'physical', 'app'].map(id => ({
        id,
        photo: `assets/poster${id === 'app' ? '4' : id === 'physical' ? '3' : id === 'mental' ? '2' : '1'}.png`,
        text: document.getElementById(`slide__${id}`)?.innerHTML || ''
      }));
;

      const [current, setCurrent] = useState(0);

      const prevSlide = () => setCurrent((current - 1 + slides.length) % slides.length);
      const nextSlide = () => setCurrent((current + 1) % slides.length);

      goToSlideExternally = (index) => {
        setCurrent(index);
      };
      
      let startX = 0;
      let endX = 0;

      const handleSwipe = () => {
        const diff = startX - endX;
        if (Math.abs(diff) > 50) {
          if (diff > 0) nextSlide();
          else prevSlide();
        }
      };
      return React.createElement('div', {
        className: 'slider',
        onTouchStart: (e) => startX = e.touches[0].clientX,
        onTouchEnd: (e) => {
          endX = e.changedTouches[0].clientX;
          handleSwipe();
        }
      };
      return React.createElement('div', { style: { position: 'relative' } },

        React.createElement('div', { className: 'nav-zone left', onClick: prevSlide, 'aria-label': 'Previous slide' }),
        React.createElement('div', { className: 'nav-zone center' }),
        React.createElement('div', { className: 'nav-zone right', onClick: nextSlide, 'aria-label': 'Next slide' }),

        React.createElement('div', {
          className: 'slides__container',
          style: { transform: `translateX(-${current * 100}%)` }
        },
          slides.map((slide, i) =>
            React.createElement('div', { key: slide.id, className: 'slide' },
              React.createElement('div', { className: 'container' },
                React.createElement('div', { className: 'row slide-row align-items-start' },
                  React.createElement('div', { className: 'col-md-6 order-md-1 order-2' },
                    React.createElement('img', { src: slide.photo, alt: slide.id, className: 'slide__image ms-md-auto mx-auto' })
                  ),
                  React.createElement('div', { className: 'slide__text col-md-6 order-md-2 order-1', dangerouslySetInnerHTML: { __html: slide.text } })
                )
              )
            )
          )
        )
      );
    }

    const root = createRoot(document.getElementById('slider__react'));
    root.render(React.createElement(Slider));

    function goToSlide(index) {
      if (typeof goToSlideExternally === 'function') {
        goToSlideExternally(index);
      }
    }
