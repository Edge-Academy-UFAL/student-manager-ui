/**
 * v0 by Vercel.
 * @see https://v0.dev/t/XegfOQ79FTb
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from 'next/link'

export default function Home() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 h-[calc(100vh-100px)] flex justify-center items-center">
      <div className="absolute top-0 z-[-2] h-screen w-screen dark:bg-[#000000] dark:bg-[radial-gradient(#ffffff33_1px,#080808_1px)] bg-[size:20px_20px]"></div>
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
      <div className="container px-4 md:px-6">
        <div className="grid items-center gap-6 lg:grid-cols-[1fr_600px] lg:gap-12 xl:grid-cols-[1fr_700px]">
          <div className="space-y-5">
            <div className="space-y-3">
              <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                Gerenciador de Alunos
              </div>
              <h1 className="text-4xl font-bold tracking-tighter leading-tighter sm:text-5xl md:tracking-tight">
                Conheça o Gerenciador de Alunos
              </h1>
              <p className="max-w-screen-md text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                A plataforma que simplifica a gestão dos alunos do{' '}
                <span
                  className="bg-gradient-to-tr from-blue-300 to-green-500 text-transparent bg-clip-text font-extrabold hover:cursor-pointer
                 hover:decoration-2 decoration-foreground hover:underline"
                >
                  Edge Academy
                </span>{' '}
                Tenha controle total do processo de aprendizado e evolução dos
                alunos.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link
                className="inline-flex h-10 items-center justify-center rounded-md bg-gradient-to-r from-[#00cdac] to-[#8ac926] px-8 text-sm font-medium text-white shadow  hover:opacity-90 disabled:pointer-events-none disabled:opacity-50 dark:hover:opacity-110  dark:opacity-90 dark:focus-visible:ring-gray-300 transition duration-300 ease-in-out delay-150 bg-blue-500 hover:-translate-y-[0.15rem]"
                href="#"
              >
                Faça Login
              </Link>
              <Link
                className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200
                  bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900
                   focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50
                    dark:border-gray-800 dark:bg-background dark:hover:bg-muted dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                href="#"
              >
                Fale com os Administradores
              </Link>
            </div>
          </div>
          {/* <img
            alt="Image"
            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center lg:order-last"
            height="340"
            src="/imagem.svg"
            width="600"
          /> */}
        </div>
      </div>
    </section>
  )
}
