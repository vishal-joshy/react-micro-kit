import { Cat } from '../types';

type CatImageFrameProps = {
  cat: Cat;
};

export default function CatImageFrame({ cat }: CatImageFrameProps) {
  return (
    <div className="border-2">
      <img src={cat.url} width={cat.width} height={cat.height} alt="cat"></img>
    </div>
  );
}
