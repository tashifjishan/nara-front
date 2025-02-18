
import { Link } from "react-router-dom";

export default function DetailSection({ title, descriptionHtml, cameFrom, price }) {

  return (
    <>
      <div className="flex flex-col xl:!gap-3 gap-1 ">

      {/* Breadcrumb */}
        <div className="hidden xl:flex gap-4 font-outfit">
          <Link className="underline flex items-center gap-3 " to="/">
            Home <img src="/icons/leftTriangleIcon.svg" alt="" />
          </Link>
          <Link to={cameFrom.link} className="underline flex items-center gap-3 ">
            {cameFrom.page} <img src="/icons/leftTriangleIcon.svg" alt="" />
          </Link>
          <Link className="text-[#656565]">{title?.slice(0, 20)}...</Link>
        </div>

        <h2 className="font-black xl:text-2xl text-xl"> {title}</h2>{" "}
        {/* Price */}
        <h3 className="tracking-tight font-semibold text-xl">
      
            {`INR ${parseFloat(price).toFixed(2)}` }

        </h3>
        <span className="text-xs tracking-tighter capitalize">(Incl. of all taxes)</span>
      </div>

      {/* Description HTML section */}

      <div className="flex flex-col gap-2">
        <h2 className="font-bold">Description </h2>
        <div
          className={`prose dark:text-white text-sm`}
          dangerouslySetInnerHTML={{
            __html: descriptionHtml
          }}></div>
      </div>


    </>
  );
}
