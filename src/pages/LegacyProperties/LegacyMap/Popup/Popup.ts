/* eslint-disable */

export interface PopupInterface extends google.maps.OverlayView {
  position: google.maps.LatLng;
  containerDiv: HTMLDivElement;
}

export default () =>
  class PopupClass extends google.maps.OverlayView {
    position: google.maps.LatLng;
    containerDiv: HTMLDivElement;

    constructor(
      position: google.maps.LatLng,
      content: HTMLElement,
      size: { width: number; height: number }
    ) {
      super();
      this.position = position;

      content.classList.add('popup-bubble');

      // This zero-height div is positioned at the bottom of the bubble.
      const bubbleAnchor = document.createElement('div');
      bubbleAnchor.classList.add('popup-bubble-anchor');
      bubbleAnchor.appendChild(content);

      // This zero-height div is positioned at the bottom of the tip.
      this.containerDiv = document.createElement('div');
      this.containerDiv.classList.add('popup-container');
      this.containerDiv.appendChild(bubbleAnchor);

      // Optionally stop clicks, etc., from bubbling up to the map.
      PopupClass.preventMapHitsAndGesturesFrom(this.containerDiv);
    }

    onAdd() {
      this.getPanes().floatPane.appendChild(this.containerDiv);
    }

    onRemove() {
      if (this.containerDiv.parentElement) {
        this.containerDiv.parentElement.removeChild(this.containerDiv);
      }
    }

    draw() {
      /* console.info(
        'div position',
        this.getProjection().fromLatLngToContainerPixel(this.position)
      ); */

      const divPosition = this.getProjection().fromLatLngToDivPixel(
        this.position
      );

      const display =
        Math.abs(divPosition.x) < 4000 && Math.abs(divPosition.y) < 4000
          ? 'block'
          : 'none';

      if (display === 'block') {
        this.containerDiv.style.left = divPosition.x + 'px';
        this.containerDiv.style.top = divPosition.y + 'px';
      }

      if (this.containerDiv.style.display !== display) {
        this.containerDiv.style.display = display;
      }
    }
  };
