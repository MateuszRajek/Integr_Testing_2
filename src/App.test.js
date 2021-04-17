import { fireEvent, render, screen } from '@testing-library/react';
import { songsList, songsFavNotFav } from './songs'
import App from './App';

describe('Display list of songs', () => {

  beforeEach(() => render(<App songsList={songsList} />));

  test('Display songs containers', () => {
    const songContainers = screen.getAllByTestId(/song-container/);
    expect(songContainers.length).toEqual(songsList.length);
  });

  for (const song of songsList) {
    test(`Display ${song} title`, () => {
      const songH2 = screen.getByTestId(`song-title-${song.title}`).textContent;
      expect(songH2).toBe(song.title)
    })
  
    test(`Display ${song} author`, () => {
      const songP = screen.getByTestId(`song-author-${song.author}`).textContent;
      expect(songP).toBe(song.author)
    })

    test('Display button for each song', () => {
      const buttons = screen.getAllByTestId(/song-btn/);
      expect(buttons.length).toEqual(songsList.length)
    })

  }
})

describe('Changes songs Fav status', () => {

  beforeEach(() => render(<App songsList={songsFavNotFav} />));

  test('Display btn with class "btn-fav" if song is favourite', () => {
    const button = screen.getAllByTestId(/song-btn/)[0];
    expect(button).toHaveClass('btn-fav');
  });

  test('Display btn without class "btn-fav" if song is not favourite', () => {
    const button = screen.getAllByTestId(/song-btn/)[1];
    expect(button).not.toHaveClass('btn-fav');
  });

  test('Changes btn class on fav after clicking on a "Add to Fav" button', () => {
    const button = screen.getAllByTestId(/song-btn/)[1];

    fireEvent.click(button)
    expect(button).toHaveClass('btn-fav');
  })

  test('Changes btn class on non-fav after clicking on a "Remove from Fav" button', () => {
    const button = screen.getAllByTestId(/song-btn/)[0];

    fireEvent.click(button)
    expect(button).not.toHaveClass('btn-fav');
  })
})

