/* eslint-disable */

export interface DistanceFromMarkerInterface extends google.maps.OverlayView {
  position: google.maps.LatLng;
  size: number;
}

export default () =>
  class DistanceFromMarker extends google.maps.OverlayView {
    anchorElement?: HTMLDivElement;
    element?: HTMLDivElement;
    position: google.maps.LatLng;
    size: number;

    constructor(position: google.maps.LatLng, size: number) {
      super();

      this.position = position;
      this.size = size;
    }

    onAdd() {
      this.anchorElement = document.createElement('div') as HTMLDivElement;
      this.element = document.createElement('div') as HTMLDivElement;

      this.anchorElement.classList.add('map-distance-from-anchor');
      this.element.classList.add('map-distance-from');

      this.anchorElement.appendChild(this.element);

      var that = this;

      google.maps.event.addDomListener(this.element, 'click', function() {
        google.maps.event.trigger(that, 'click');
      });

      this.getPanes()!.overlayMouseTarget.appendChild(this.anchorElement);
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

      if (this.anchorElement && this.element) {
        this.anchorElement.style.left = `${sw.x}px`;
        this.anchorElement.style.top = `${ne.y}px`;
        this.element.style.top = `${-this.size}px`;
        this.element.style.left = `${-this.size / 2}px`;
      }
    }
  };
