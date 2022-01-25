/* eslint-disable */

export interface ClusterMarkerInterface extends google.maps.OverlayView {
  position: google.maps.LatLng;
  title: string;
  element?: HTMLDivElement;
}

export default () =>
  class ClusterMarker extends google.maps.OverlayView {
    position: google.maps.LatLng;
    title: string;
    element?: HTMLDivElement;

    constructor(position: google.maps.LatLng, title: string) {
      super();

      this.position = position;
      this.title = title;
    }

    onAdd() {
      this.element = document.createElement('div');
      this.element.classList.add('map-marker');
      this.element.textContent = this.title;

      this.getPanes()!.overlayMouseTarget.appendChild(this.element);
    }

    onRemove() {
      if (this.element) {
        (this.element.parentNode as HTMLElement).removeChild(this.element);
        delete this.element;
      }
    }

    draw() {
      const overlayProjection = this.getProjection();

      const sw = overlayProjection.fromLatLngToDivPixel(this.position)!;
      const ne = overlayProjection.fromLatLngToDivPixel(this.position)!;

      if (this.element) {
        this.element.style.left = `${sw.x}px`;
        this.element.style.top = `${ne.y}px`;
      }
    }
  };
