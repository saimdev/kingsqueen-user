import Slider from "react-slick"
import {ChevronLeft, ChevronRight} from "react-bootstrap-icons"

const RightArror = ()=> '>';

const ProductSlider = ({ children }) => {
    const sliderSettings = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 3,
        speed: 500,
        dots: true,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: true,
                dots: true
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ]
    };

    const NextArrowButton = ({currentSlide, slideCount, ...props})=>{
      return <span {...props}><ChevronLeft color="red" fontSize={30} /></span>
    }

    const PrevArrowButton = ({currentSlide, slideCount, ...props})=>{
      return <span {...props}><ChevronRight color="red" fontSize={30}/></span>
    }

    return (
        <Slider {...sliderSettings} className="productSlider" accessibility={true} arrows={true}>
            {children}
        </Slider>
    )
}

export default ProductSlider