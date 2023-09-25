class SwiperCustomMobile {
    sliderMobileContainer = document.getElementById('slider-container-mobile');
    sliderMobile = document.getElementById('slider-mobile');
    buttonLeft = document.getElementById('button-mobile-left');
    buttonRight = document.getElementById('button-mobile-right');
    sliderMobileElements = document.querySelectorAll('.slider__mobile__element')
    rootStyles = document.documentElement.style;
    
    slideCounterMobile = 0;
    // guarda el index del elemento actual, al ser un array comienza en 0
    indexCurrentSlide = 0;
    preventTransition = false;
    
    countShowElements = 3;
    
    DIRECTIONS = {
        Left: 'Left',
        Right: 'Right'
    };

    callBackChangeSlide = () => {};

    constructor(changeSlideFn) {
        this.init();
        this.callBackChangeSlide = changeSlideFn;
    }
    
    getCrrentTransformValue = () => {
        return Number(this.rootStyles.getPropertyValue('--slide--mobile--transform').replace('px', ''));
    }
    
    initializeElements = () => {
        let _index = 0;
        for (const slide of this.sliderMobileElements.entries()) {
            slide[1].setAttribute('index', _index);
            _index++;
        }
        for (const slide of this.sliderMobileElements.entries()) {
            slide[1].addEventListener('click', (event) => {
                let _indexEvent;
                if(!event.target.classList.contains('slider__mobile__element')) {
                    _indexEvent = Number(event.target.parentNode.getAttribute('index'));
                } else {
                    _indexEvent = Number(event.target.getAttribute('index'));
                }
                
                // let transformValue = this.getCrrentTransformValue();
                let steps = _indexEvent - this.indexCurrentSlide;

                // let i=0;
                // console.log(_indexEvent, this.slideCounterMobile, steps)
                if(steps === 1 || steps === -4) {
                    this.buttonRight.click();
                } else if(steps === 2 || steps == -3) {
                    this.buttonRight.click();
                    setTimeout(() => {
                        this.buttonRight.click();
                    }, 700);
                }

                // let widthCurrentSlide = this.sliderMobileElements[this.slideCounterMobile].scrollWidth;
                // transformValue -= widthCurrentSlide * steps;

                // this.rootStyles.setProperty('--slide--mobile--transform', `${transformValue}px`);
                // console.log(transformValue);
                
                // this.slideCounterMobile = _indexEvent;
                // this.reorderSlideMobile(_indexEvent);
            });
        }
    }
    
    reorderSlideMobile = () => {
        let transformValue = this.getCrrentTransformValue();
        let widthCurrentSlide = this.sliderMobileElements[this.slideCounterMobile].scrollWidth;
        this.rootStyles.setProperty('--slide--mobile--transition', 'none');
        if((this.slideCounterMobile + this.countShowElements) === this.sliderMobileElements.length) {
            this.sliderMobile.appendChild(this.sliderMobile.firstElementChild);
            transformValue += widthCurrentSlide;
            this.slideCounterMobile--;
        } else if (this.slideCounterMobile === 0) {
            this.sliderMobile.prepend(this.sliderMobile.lastElementChild);
            transformValue -= widthCurrentSlide;
            this.slideCounterMobile++;
        }
        this.rootStyles.setProperty('--slide--mobile--transform', `${transformValue}px`);
        this.preventTransition = false;
    }
    
    setCurrentSlideClasses = (index) => {
        let _indexShowElemets = [];
        let _index = index;
        let i = 0;
        for (i; i< this.countShowElements; i++) {
            if(_index > this.sliderMobileElements.length - 1) {
                _index = 0;
            }
            _indexShowElemets.push(_index);
            _index++;
        }
        for (const sliderElement of this.sliderMobileElements.entries()) {
            let _slideIndex = Number(sliderElement[1].getAttribute('index'));
            sliderElement[1].classList.remove('slider__mobile__element__desapears');
            if(!_indexShowElemets.includes(_slideIndex)) {
                sliderElement[1].classList.add('slider__mobile__element__desapears');
            }
            
            sliderElement[1].classList.remove('current__slide');
        }
        this.sliderMobileElements[index].classList.add('current__slide');
        this.callBackChangeSlide(index);
    }
    
    moveSlide = (direction) => {
        if (this.preventTransition) return;
        this.preventTransition = true;
        let transformValue = this.getCrrentTransformValue();
        let widthCurrentSlide = this.sliderMobileElements[this.slideCounterMobile].scrollWidth;
        this.rootStyles.setProperty('--slide--mobile--transition', 'transform .4s');
        if (direction ===  this.DIRECTIONS.Left) {
            transformValue += widthCurrentSlide;
            this.slideCounterMobile--;
            if(this.indexCurrentSlide === 0) {
                this.indexCurrentSlide = this.sliderMobileElements.length - 1;
            } else {
                this.indexCurrentSlide--;
            }
        } else if (direction === this.DIRECTIONS.Right) {
            transformValue -= widthCurrentSlide;
            this.slideCounterMobile++;
            if(this.indexCurrentSlide === this.sliderMobileElements.length - 1) {
                this.indexCurrentSlide = 0;
            } else {
                this.indexCurrentSlide++;
            }
        }
        this.rootStyles.setProperty('--slide--mobile--transform', `${transformValue}px`);
        this.setCurrentSlideClasses(this.indexCurrentSlide);
    }
    
    init() {
        this.buttonRight.addEventListener('click', () => this.moveSlide(this.DIRECTIONS.Right));
        this.buttonLeft.addEventListener('click', () => this.moveSlide(this.DIRECTIONS.Left));
        
        this.sliderMobile.addEventListener('transitionend', this.reorderSlideMobile );
        
        this.rootStyles.setProperty('--slide--mobile--item--show', `${this.countShowElements}`);
        
        this.initializeElements();
        this.reorderSlideMobile();
        this.setCurrentSlideClasses(this.indexCurrentSlide);
        this.callBackChangeSlide(this.indexCurrentSlide);
    }
}


changeSlideEventMobile = (index) => {
    console.log('ChangeSlide', index);
}
const _mobile = new SwiperCustomMobile(changeSlideEventMobile);