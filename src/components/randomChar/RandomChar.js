import { useState, useEffect } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';
import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

const RandomChar = () => {
    const [char, setChar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const marvelService = new MarvelService();

    useEffect(() => {
        updateChar();
        const timerId = setInterval(updateChar, 60000);

        return () => {
            clearInterval(timerId);
        };
    }, []);

    const onCharLoaded = (char) => {
        console.log('Character loaded:', char); // Добавим логирование
        setChar(char);
        setLoading(false);
        setError(false);
    };

    const onError = (err) => {
        console.error('Error fetching character:', err); // Логируем ошибку
        setError(true);
        setLoading(false);
    };

    const updateChar = () => {
        const id = Math.floor(Math.random() * 20) + 1;
        console.log('Fetching character with id:', id); // Логируем ID персонажа
        setLoading(true);
        setError(false);
        
        marvelService
            .getCharacter(id)
            .then(onCharLoaded)
            .catch(onError);
    };

    // Добавим проверку на наличие данных в char
    const hasData = !(loading || error) && char;

    return (
        <div className="randomchar">
            {error && <ErrorMessage />}
            {loading && <Spinner />}
            {hasData && <View char={char} />}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br />
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button onClick={updateChar} className="button button__main">
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
            </div>
        </div>
    );
};

const View = ({ char }) => {
    const { name, description, thumbnail, homepage, wiki } = char;
    
    const imgStyle = thumbnail.includes('image_not_available') 
        ? { objectFit: 'contain' } 
        : { objectFit: 'cover' };

    return (
        <div className="randomchar__block">
            <img 
                src={thumbnail} 
                alt={name} 
                className="randomchar__img" 
                style={imgStyle} 
            />
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description || 'No description available'}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default RandomChar;