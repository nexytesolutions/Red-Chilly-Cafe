interface MenuScrollPosition {
  page: number;
  list: number;
}

let savedMenuScrollPosition: MenuScrollPosition | null = null;

export function saveMenuScrollPosition(listScrollTop: number): void {
  savedMenuScrollPosition = {
    page: window.scrollY,
    list: listScrollTop,
  };
}

export function consumeMenuScrollPosition(): MenuScrollPosition | null {
  const position = savedMenuScrollPosition;
  savedMenuScrollPosition = null;
  return position;
}
