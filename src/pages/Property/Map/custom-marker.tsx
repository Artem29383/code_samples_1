/* eslint-disable */
import React from 'react'
import ReactDOMServer from 'react-dom/server';

import * as Styled from './Map.Styled';

type Icon = { src: string; size: number };

let textRef: HTMLDivElement;
let containerRef: HTMLDivElement | undefined;
let markerExist = '';

export interface ClusterMarkerInterface extends google.maps.OverlayView {
  position: google.maps.LatLng;
  title: string;
  anchorElement?: HTMLDivElement;
  container?: HTMLDivElement;
  mainElement?: HTMLDivElement;
  icon: Icon | null;
  id: string;
}

let markerOpen: HTMLDivElement | undefined;
let zAnchor: HTMLDivElement | undefined;


export default () =>
  class ClusterMarker extends google.maps.OverlayView {
    position: google.maps.LatLng;
    title: string;
    anchorElement?: HTMLDivElement;
    mainElement?: HTMLDivElement;
    container?: HTMLDivElement;
    iconElement?: HTMLImageElement;
    textElement?: HTMLDivElement;
    id: string;
    icon: Icon;

    constructor(
      position: google.maps.LatLng,
      title: string,
      icon: Icon,
      id: string
    ) {
      super();

      this.position = position;
      this.title = title;
      this.icon = icon;
      this.id = id;
    }

    onAdd() {
      this.anchorElement = document.createElement('div');
      this.mainElement = document.createElement('div');
      this.container = document.createElement('div');

      this.anchorElement.classList.add('map-marker');
      this.mainElement.classList.add('map-marker-style');
      this.container.classList.add('map-marker-container')

      const icon = this.icon

      const html = ReactDOMServer.renderToString(<Styled.Img src={icon.src} alt="" />)

      this.anchorElement.append(this.mainElement);
      this.mainElement.append(this.container);

      this.container.insertAdjacentHTML(
        'afterbegin',
        html
      );

      google.maps.event.addDomListener(this.anchorElement, 'click', (e) => {
        // @ts-ignore
        if (e.target?.localName === 'a') return;
        if (markerExist === this.id) {
          zAnchor.style.zIndex = String(0);
          markerOpen!.classList.remove('map-marker-animate-in');
          textRef.style.display = 'none';
          containerRef?.classList.remove('between');
          if (textRef) {
            (textRef.parentNode as HTMLElement).removeChild(
              textRef
            );
          }
          markerExist = '';
          zAnchor = undefined;
          return;
        }
        markerExist = this.id;
        if (markerOpen && zAnchor) {
          zAnchor.style.zIndex = String(0);
          markerOpen!.classList.remove('map-marker-animate-in');
          if (textRef) {
            (textRef.parentNode as HTMLElement).removeChild(
              textRef
            );
          }
        }
        markerOpen = this.mainElement;
        zAnchor = this.anchorElement;
        zAnchor!.style.zIndex = '3';
        google.maps.event.trigger(this, 'click');
      });

      this.getPanes()!.overlayMouseTarget.appendChild(this.anchorElement);
    }

    getElement() {
      return this.mainElement;
    }

    onRemove() {
      if (this.anchorElement) {
        (this.anchorElement.parentNode as HTMLElement).removeChild(
          this.anchorElement
        );
        delete this.anchorElement;
      }
    }

    onAddAfterClick = (html: string) => {
      this.textElement = document.createElement('div');
      this.textElement.classList.add('map-marker-text');

      this.textElement!.insertAdjacentHTML(
        'afterbegin',
        html
      );
      textRef = this.textElement;
      containerRef = this.container;
      this.container?.append(this.textElement);
    }

    draw() {
      const overlayProjection = this.getProjection();

      const sw = overlayProjection.fromLatLngToDivPixel(this.position)!;
      const ne = overlayProjection.fromLatLngToDivPixel(this.position)!;

      if (this.anchorElement) {
        this.anchorElement.style.left = `${sw.x}px`;
        this.anchorElement.style.top = `${ne.y}px`;
      }

      if (this.icon && this.iconElement) {
        this.iconElement.style.width = `${this.icon.size}px`;
        this.iconElement.style.height = `${this.icon.size}px`;
      }
    }
  };
