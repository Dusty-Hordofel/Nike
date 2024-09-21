"use client";
import { Button } from "@/components/ui/buttons/button/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";
import { UseFormReset } from "react-hook-form";
// import "./modal.css";

type ModalProps = {
  title: string;
  // content: string;
  // closeModal: (
  //   reset?: UseFormReset<{
  //     category: string;
  //   }>
  // ) => void;
  onCloseModal: () => void;
  // onConfirm?: boolean;
  children: ReactNode;
};

const Modal = ({
  title,
  // content,
  onCloseModal,
  // onConfirm,
  children,
}: ModalProps) => {
  return (
    <div
      id="modal-root"
      //   backdrop-blur-sm backdrop-filter
      className=" fixed inset-0 bg-[hsla(0,0%,7%,0.36)]  flex justify-center items-center z-[900]"
    >
      <div className="relative p-12 bg-white  rounded-3xl w-[536px]">
        <div role="modal" aria-labelledby="modal-erreur">
          <section>
            <div>
              <div className="close-btn-container absolute top-[52px] right-[64px] rounded-full border flex justify-center items-center size-9">
                <button
                  aria-label="Close Modal"
                  type="button"
                  onClick={onCloseModal}
                >
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    viewBox="0 0 24 24"
                    role="img"
                    width="24px"
                    height="24px"
                    fill="none"
                  >
                    <path
                      stroke="currentColor"
                      stroke-width="1.5"
                      d="M18.973 5.027L5.028 18.972M5.027 5.027l13.945 13.945"
                    ></path>
                  </svg>
                  <span className="ripple"></span>
                </button>
              </div>

              <header className="pr-12 pb-6 pt-1">
                <h1
                  className="text-2xl font-medium"
                  id="modal-erreur"
                  data-testid="modal-header-title"
                >
                  {title}
                </h1>
              </header>

              {children}

              {/* <p className="mb-4">
                {content}
                <br />
                <span className="error-code ncss-base mb8-sm u-bold">
                  [Code : 8E49F73C ]
                </span>
              </p> */}
            </div>
            {/* <div className="pt-6 pl-16 flex justify-end gap-x-4">
              <Button
                aria-label="OK"
                // type="submit"
                variant="outline"
                onClick={() => {
                  closeModal();
                }}
              >
                Cancel
              </Button>
              <Button
                aria-label="OK"
                type="submit"
                // onClick={() => {
                //   // closeModal();
                //   // if (onConfirm) window.location.href = "/";
                // }}
              >
                Create
              </Button>
            </div> */}
          </section>
        </div>
      </div>
    </div>
  );
};

export default Modal;