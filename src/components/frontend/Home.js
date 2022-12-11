import React from 'react';

function Home() {

    return (
        <div className='container-fluid'>
            <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src="https://championsleagueshirts.com/wp-content/uploads/2017/10/Real_Madrid_Uniform_for_2018_Feature-678x381.jpg" className="rounded mx-auto d-block w-75" alt="..." />
                        <div className="carousel-caption d-none d-md-block">
                            <h5>New product</h5>
                            <p>Manchester United home 2022-2023</p>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src="https://jdsportsblog.s3.amazonaws.com/wp-content/uploads/2022/07/mufc1.jpg" className="rounded mx-auto d-block w-75" alt="..." />
                        <div className="carousel-caption d-none d-md-block">
                            <h5>Second slide label</h5>
                            <p>Some representative placeholder content for the second slide.</p>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src="https://scontent.fsgn4-1.fna.fbcdn.net/v/t39.30808-6/235810362_10158806944882746_2014719950347893440_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=e3f864&_nc_ohc=f90iGomnKTQAX-22aR6&_nc_ht=scontent.fsgn4-1.fna&oh=00_AfCfWqqiwmjJA939BCrgbEfHvDaKGV7mAgShDFRqBr21Fw&oe=6398B56A" className="rounded mx-auto d-block w-75" alt="..." />
                        <div className="carousel-caption d-none d-md-block">
                            <h5>Third slide label</h5>
                            <p>Some representative placeholder content for the third slide.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Home;
