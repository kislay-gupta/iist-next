type PageParams = {
  params: Promise<{
    slug: string;
    id: string;
  }>;
};
export default async function Page({
    params,
  }: PageParams) {
    const resolvedParams = await (params);
    console.log(resolvedParams.slug[0]);
    return <h1>{resolvedParams.slug[0]}/{resolvedParams.slug[1]}</h1>
  }