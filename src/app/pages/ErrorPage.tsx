import React from "react";
import { Link, isRouteErrorResponse, useRouteError } from "react-router";
import { motion } from "motion/react";
import { useDocumentTitle } from "../useDocumentTitle";

type ErrorStateProps = {
  code: string;
  label: string;
  title: string;
  message: string;
};

const ErrorState = ({ code, label, title, message }: ErrorStateProps) => {
  useDocumentTitle(`mol - ${code}`);

  return (
    <main className="w-full bg-white pb-32 pt-24 md:pt-32">
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 mb-16 md:mb-24">
        <Link to="/" className="inline-flex items-center gap-2 group">
          <span className="font-['Inter',_sans-serif] text-[10px] md:text-xs text-stone-400 group-hover:text-stone-900 tracking-widest uppercase transition-colors">
            ← Back to Home
          </span>
        </Link>
      </div>

      <section className="w-full max-w-[1400px] mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="grid gap-12 border-t border-stone-200 pt-10 md:grid-cols-[180px_minmax(0,1fr)] md:gap-20 md:pt-14"
        >
          <div className="flex flex-col gap-2">
            <span className="font-['Inter',_sans-serif] text-5xl md:text-7xl font-light text-stone-300 tracking-[0.08em]">
              {code}
            </span>
            <span className="font-['Inter',_sans-serif] text-[10px] md:text-xs text-stone-400 tracking-[0.28em] uppercase">
              {label}
            </span>
          </div>

          <div className="flex flex-col gap-8 md:gap-10">
            <div className="flex flex-col gap-4 md:gap-6">
              <h1 className="font-['Noto_Serif_JP',_serif] text-3xl md:text-5xl text-stone-900 tracking-[0.06em] leading-tight">
                {title}
              </h1>
              <p className="max-w-2xl font-['Noto_Serif_JP',_serif] text-sm md:text-base text-stone-600 leading-loose tracking-[0.08em]">
                {message}
              </p>
            </div>

            <div className="flex flex-col gap-4 border-t border-stone-100 pt-8 md:flex-row md:items-center md:gap-10">
              <Link
                to="/"
                className="font-['Inter',_sans-serif] text-[10px] md:text-xs text-stone-500 tracking-[0.22em] uppercase hover:text-stone-900 transition-colors"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="font-['Inter',_sans-serif] text-[10px] md:text-xs text-stone-500 tracking-[0.22em] uppercase hover:text-stone-900 transition-colors"
              >
                About
              </Link>
              <Link
                to="/process"
                className="font-['Inter',_sans-serif] text-[10px] md:text-xs text-stone-500 tracking-[0.22em] uppercase hover:text-stone-900 transition-colors"
              >
                Process
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
};

export const NotFoundPage = () => {
  return (
    <ErrorState
      code="404"
      label="Page Not Found"
      title="お探しのページは見つかりませんでした。"
      message="URL が変更されたか、リンク先が削除されている可能性があります。トップページから作品一覧へお戻りください。"
    />
  );
};

export const RouteErrorPage = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return <NotFoundPage />;
    }

    return (
      <ErrorState
        code={String(error.status)}
        label="Route Error"
        title="ページの表示中に問題が発生しました。"
        message={error.statusText || "時間をおいて再度お試しください。"}
      />
    );
  }

  const message =
    error instanceof Error
      ? error.message
      : "ページの表示中に予期しないエラーが発生しました。";

  return (
    <ErrorState
      code="Error"
      label="Unexpected State"
      title="ページの表示中に問題が発生しました。"
      message={message}
    />
  );
};
