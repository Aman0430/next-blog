"use client";

import React, { Fragment, useRef } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const AddBlogs = () => {
  const router = useRouter();

  const titleRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);

  const postBlog = async ({
    title,
    description,
  }: {
    title: String;
    description: String;
  }) => {
    const res = fetch("http://localhost:3000/api/blog", {
      method: "POST",
      body: JSON.stringify({ title, description }),
      //@ts-ignore
      "Content-Type": "application/json",
    });
    return (await res).json();
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (titleRef.current && descriptionRef.current) {
      toast.loading("Sending Request", { id: "1" });
      await postBlog({
        title: titleRef.current?.value,
        description: descriptionRef.current?.value,
      });
      toast.success("Good to Go...", { id: "1" });
    }
    router.push("/");
  };

  return (
    <Fragment>
      <Toaster />
      <div className="w-full m-auto flex my-4">
        <div className="flex flex-col justify-center items-center m-auto">
          <p className="text-2xl text-slate-200 font-bold p-3">Add Blog</p>

          <form onSubmit={handleSubmit}>
            <input
              ref={titleRef}
              placeholder="Enter Title"
              type="text"
              className="rounded-md px-4 w-full py-2 my-2 text-slate-700"
            />
            <textarea
              ref={descriptionRef}
              placeholder="Enter Description"
              className="rounded-md px-4 py-2 w-full my-2 text-slate-700"
            ></textarea>
            <button className="font-semibold px-4 py-2 shadow-xl bg-slate-300 rounded-md m-auto hover:bg-gray-400 transition">
              Submit
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default AddBlogs;
