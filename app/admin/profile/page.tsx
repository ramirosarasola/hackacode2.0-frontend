import Image from "next/image";

export default function Profile() {
  return (
    <section className="bg-white p-6 flex flex-col justify-between items-center gap-16 text-[#000] ">
      {/* ProfileHeader */}
      <div className="profile-header h-[5rem] w-full border-b border-[#CDDEFF] text-[#000]">
        <h5>Jane Cooper</h5>
        <p className="text-[#A8B1CF]">@Janec</p>
      </div>

      {/* ProfileContent */}
      <div className=" w-full flex gap-8 ">

        {/* Personal Details Card */}
        <article className="w-[70%] h-[315px]  border border-[#CDDEFF] rounded-lg ">

          <div className="card-title h-[75px] border-b border-[#cddeff] text-[#000] flex px-6 items-center">
            Card Title
          </div>

          <div className="profile-section px-6 bg-red-500 flex justify-between items-center">

            <div className="w-[30%] h-full flex flex-col items-center justify-center py-4 gap-2">
              <Image src="/" alt="" className="rounded-full" width={70} height={70} />
              <h5>Full Name</h5>
              <p>Jane Cooper</p>
            </div>

            <div className="flex w-[70%] h-full items-center py-4">
              <div className="flex flex-col flex-1 gap-2">
                {/* User Information */}
                <p>
                  Username: @Janec
                </p>
                <p>
                  Username: @Janec
                </p>
                <p>
                  Username: @Janec
                </p>
                <p>
                  Username: @Janec
                </p>
              </div>
              <div className="flex flex-col flex-1 gap-2">
                {/* User Information */}
                <p>
                  Username: @Janec
                </p>
                <p>
                  Username: @Janec
                </p>
                <p>
                  Username: @Janec
                </p>
                <p>
                  Username: @Janec
                </p>
              </div>
            </div>

          </div>

        </article>

        {/* Payment Details */}
        <div className="w-[30%] h-[315px] border border-[#CDDEFF] rounded-lg ">
          <div className="card-title h-[75px] border-b border-[#cddeff] text-[#000] flex px-6 items-center">
            Card Title
          </div>
        </div>
      </div>

      {/* ProfileContent */}
      <div className=" w-full flex gap-8">
        {/* Job Details */}
        <div className="w-[70%] h-[315px]  border border-[#CDDEFF] rounded-lg ">
          <div className="card-title h-[75px] border-b border-[#cddeff] text-[#000] flex px-6 items-center">
            Card Title
          </div>
        </div>
        {/* Address */}
        <div className="w-[30%] h-[315px]  border border-[#CDDEFF] rounded-lg ">
          <div className="card-title h-[75px] border-b border-[#cddeff] text-[#000] flex px-6 items-center">
            Card Title
          </div>
        </div>
      </div>
    </section>
  );
}
