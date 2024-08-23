"use client";
import { Button } from "@/components/ui/buttons/button/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import React from "react";
// import "./modal.css";

type ModalProps = {
  title: string;
  content: string;
  closeModal: () => void;
  onConfirm?: boolean;
};

const ResultModal = ({ title, content, closeModal, onConfirm }: ModalProps) => {
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
                  onClick={() => {
                    closeModal();
                    if (onConfirm) window.location.href = "/";
                  }}
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
                  className="text-2xl"
                  id="modal-erreur"
                  data-testid="modal-header-title"
                >
                  {title}
                </h1>
              </header>

              <p className="mb-4">
                {content}
                <br />
                <span className="error-code ncss-base mb8-sm u-bold">
                  [Code : 8E49F73C ]
                </span>
              </p>
            </div>
            <div className="pt-6 pl-16 flex justify-end">
              <Button
                aria-label="OK"
                type="submit"
                onClick={() => {
                  closeModal();
                  if (onConfirm) window.location.href = "/";
                }}
              >
                OK<span></span>
              </Button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ResultModal;
