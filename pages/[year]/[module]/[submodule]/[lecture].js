import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { getSortedPostsData, sidebar } from "../../../../lib/posts";
import { getMarkdown } from "../../../../lib/markdown";
import Nav from "../../../../components/nav";
import SidebarItem from "../../../../components/sidebar_item";

// const Post = () => {
//   const router = useRouter();
//   const { module, year } = router.query;

//   return (
//     <p>
//       Post: {module} and {year}
//     </p>
//   );
// };

// export default Post;

export default function Lecture({ allPostsData, sidebarReturn, mdReturn }) {
  const router = useRouter();
  const { module, year } = router.query;
  return (
    <div>
      <Head>
        <title>Sam's notes</title>
      </Head>
      <Nav years={allPostsData} selectedYear={year} />

      <div className="flex">
        <div className="flex-none w-full max-w-xs text-black bg-white p-4 shadow-xl rounded-br">
          <h2 className="text-2xl mb-4">{module.replace(/_/g, " ")}</h2>
          <hr className="mb-4" />
          <ul className="text-lg">
            {sidebarReturn.map(({ fileName, subFolders }) => (
              <SidebarItem fileName={fileName} subFolders={subFolders} />
            ))}
          </ul>
        </div>
        <div className="flex-1 text-black">
          <div className="text-center text-3xl">{mdReturn.title}</div>
          <div
            className="p-16"
            dangerouslySetInnerHTML={{ __html: mdReturn.contentHtml }}
          />
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps(context) {
  const allPostsData = getSortedPostsData();
  const sidebarReturn = sidebar(context);
  const mdReturn = await getMarkdown(context);
  return {
    props: {
      allPostsData,
      sidebarReturn,
      mdReturn,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [
      {
        params: {
          year: "Year_1",
          module: "Algorithms_and_Data_Structures",
          submodule: "Algorithms",
          lecture: "pre-rendering",
        },
      },
    ],
    fallback: false, // See the "fallback" section below
  };
}
