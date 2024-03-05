export default function AuthFormTitle({size}: {size: string}) {
  return (
    <div className="title flex items-center">
        <h1 className={`text-black ${size === "sm"? "text-2xl" : "text-4xl"}`}>
          <span className="text-tertiary font-semibold">Go</span>Travel
        </h1>
        <svg
          width={`${size === "sm"? "25px" : "50"}`}
          height={`${size === "sm"? "25" : "50"}`}
          viewBox="0 0 50 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M20.3688 27.0585L15.6871 25.4979C10.7845 23.8638 8.33325 23.0467 8.33325 21.5451C8.33325 20.0435 10.7845 19.2264 15.687 17.5922L15.687 17.5922L33.4228 11.6803C36.8724 10.5305 38.5972 9.95554 39.5076 10.866C40.4181 11.7764 39.8431 13.5012 38.6933 16.9508L38.6933 16.9508L32.7814 34.6865C31.1472 39.5891 30.3301 42.0403 28.8285 42.0403C27.3269 42.0403 26.5098 39.5891 24.8757 34.6865L23.3151 30.0048L32.385 20.9349C33.1986 20.1213 33.1986 18.8022 32.385 17.9886C31.5714 17.175 30.2523 17.175 29.4387 17.9886L20.3688 27.0585Z"
            fill="#5A81FA"
          />
        </svg>
      </div>
  )
}