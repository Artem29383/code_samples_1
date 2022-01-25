/* eslint-disable */
import React from 'react'

export interface ClusterMarkerInterface extends google.maps.OverlayView {
  position: google.maps.LatLng;
  title: string;
  anchorElement?: HTMLDivElement;
  mainElement?: HTMLDivElement;
  text?: HTMLDivElement;
  cross?: HTMLDivElement;
  id: string;
}


export default () =>
  class ClusterMarker extends google.maps.OverlayView {
    position: google.maps.LatLng;
    title: string;
    anchorElement?: HTMLDivElement;
    mainElement?: HTMLDivElement;
    text?: HTMLDivElement;
    cross?: HTMLDivElement;
    id: string;

    constructor(
      position: google.maps.LatLng,
      title: string,
      id: string
    ) {
      super();

      this.position = position;
      this.title = title;
      this.id = id;
    }

    setTitle = (title: string) => {
      this.title = title;
    }

    onAdd() {
      this.anchorElement = document.createElement('div');
      this.mainElement = document.createElement('div');
      this.text = document.createElement('div');
      this.cross = document.createElement('div');

      this.anchorElement.classList.add('map-marker');
      this.mainElement.classList.add('map-marker-style');
      this.text.classList.add('map-marker-text');
      this.cross.classList.add('map-marker-cross');

      this.text.innerText = this.title;
      this.anchorElement.append(this.mainElement);
      this.mainElement.insertAdjacentElement('afterbegin', this.cross)
      this.mainElement.insertAdjacentElement('afterbegin', this.text)

      google.maps.event.addDomListener(this.anchorElement, 'click', (e) => {
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

    draw() {
      const overlayProjection = this.getProjection();

      const sw = overlayProjection.fromLatLngToDivPixel(this.position)!;
      const ne = overlayProjection.fromLatLngToDivPixel(this.position)!;

      if (this.anchorElement) {
        this.anchorElement.style.left = `${sw.x}px`;
        this.anchorElement.style.top = `${ne.y}px`;
      }
    }
  };
