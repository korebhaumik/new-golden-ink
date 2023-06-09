import { useRef, MouseEvent, useContext } from "react";
import { motion } from "framer-motion";
import { BookType } from "../context/Store.context";
import { CheckSVG, StarSVG, ShieldSVG } from "../assets/svg";
import { ImageContext } from "../context/Image.context";
import { useCart } from "../hooks/useCart";

export default function ItemPreview({ setBool, book }: ItemPreviewProps) {
  const ModalRef = useRef<HTMLDivElement>(null);
  const imageArr = useContext(ImageContext);
  const { addToCart } = useCart();

  function handleIsOpen(
    event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) {
    if (!ModalRef.current?.contains(event.target as HTMLElement)) {
      document.body.style.overflow = "auto";
      setBool(false);
    }
  }

  const BajArrJSX: JSX.Element[] = book.genre.map((genre) => {
    return <Baj label={genre} key={Math.random()} />;
  });
  return (
    // Overlay
    <motion.div
      className="fixed inset-0 z-10 flex items-center justify-center h-full bg-black bg-opacity-60"
      initial={{
        opacity: 0,
        filter: "blur(0)",
      }}
      animate={{
        opacity: 100,
      }}
      transition={{
        ease: "easeOut",
        duration: 0.3,
      }}
      exit={{
        opacity: 0,
        transition: {
          ease: "easeIn",
          duration: 0.2,
        },
      }}
      onClick={(e) => {
        handleIsOpen(e);
      }}
    >
      {/* Modal */}
      <motion.div
        ref={ModalRef}
        className="absolute flex px-5 py-10 flex-wrap justify-between z-20 w-full sm:p-10 sm:px-12 sm:w-[47.25rem] rounded h-fit mx-auto bg-slate-200 "
        initial={{
          opacity: 0,
          scale: 0.95,
          // y: 4,
        }}
        animate={{
          opacity: 100,
          scale: 1,
          y: 0,
        }}
        transition={{
          ease: "easeOut",
          duration: 0.3,
        }}
        exit={{
          opacity: 0,
          scale: 0.95,
          transition: {
            ease: "easeIn",
            duration: 0.2,
          },
        }}
      >
        {/* @ts-ignore */}
        <img src={imageArr[book.url]} className="hidden sm:block border-2 border-black h-80" />
        <div className="sm:w-96 ">
          <h1 className="text-2xl">{book.title}</h1>
          <h2 className="text-lg text-accent-blue-600">- {book.author}</h2>
          <div className="flex items-center">
            <h2 className="text-xl">₹ 500</h2>
            <hr className="w-1 h-5 mx-3 border-none rounded bg-primary-400" />
            <div className="flex items-center">
              <Stars num={book.rating} />
              <h2 className="text-yellow-500 underline cursor-pointer">
                {/* {"(Reviews)"} */}
              </h2>
            </div>
          </div>
          <div className="flex flex-wrap">{BajArrJSX}</div>
          <p className="mb-2">{book.description}</p>
          <div className="flex items-center">
            <CheckSVG />
            <p className="text-primary-400">In stock and ready to ship</p>
          </div>
          <button
            className="w-full py-3 my-3 font-medium text-white rounded bg-accent-blue-800"
            onClick={() => {
              addToCart(book);
              document.body.style.overflow = "auto";
              setBool((prev) => !prev);
            }}
          >
            Add to Cart
          </button>
          <div className="flex text-accent-green-600">
            <ShieldSVG />
            <p>Guarenteed Delivery in 2 Days.</p>
          </div>
        </div>
        {/* <CrossSVG /> */}
      </motion.div>
    </motion.div>
  );
}

function Baj({ label }: { label: string }) {
  return (
    <div
      key={Math.random()}
      className="p-2 mr-2 my-2 text-white bg-primary-600 w-fit rounded text-sm tracking-wider"
    >
      {label}
    </div>
  );
}

type ItemPreviewProps = {
  book: BookType;
  setBool: React.Dispatch<React.SetStateAction<boolean>>;
};

function Stars({ num }: { num: number }) {
  const StarsArrJSX: JSX.Element[] = [];
  for (let i = 0; i < num; i++) {
    StarsArrJSX.push(<StarSVG className="w-5 h-5 text-yellow-500" key={i} />);
  }
  return <div className="flex">{StarsArrJSX}</div>;
}
