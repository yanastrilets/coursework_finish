import Carousel from 'react-bootstrap/Carousel';
import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {random} from "nanoid";

export const MyCarousel = ({ data }) => {
    const randomIndex1 = Math.floor(Math.random() * data.length);
    const randomIndex2 = Math.floor(Math.random() * data.length);
    const randomIndex3 = Math.floor(Math.random() * data.length);
    return (
        <Carousel>
            <Carousel.Item>
                <img src={data[randomIndex1].src}></img>
                <Carousel.Caption>
                    {/*<h3>First slide label</h3>*/}
                    {/*<p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>*/}
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img src={data[randomIndex2].src}></img>
                <Carousel.Caption>
                    {/*<h3>Second slide label</h3>*/}
                    {/*<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>*/}
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img src={data[randomIndex3].src}></img>
                <Carousel.Caption>
                    {/*<h3>Third slide label</h3>*/}
                    {/*<p>*/}
                    {/*    Praesent commodo cursus magna, vel scelerisque nisl consectetur.*/}
                    {/*</p>*/}
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
};
