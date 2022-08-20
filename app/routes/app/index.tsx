import { json, LoaderFunction } from "@remix-run/server-runtime";
import { getSession, logout, USER_SESSION_KEY, USER_TOKENS_KEY } from "~/session.server";
import { check } from "~/models/auth.server";
import { useLoaderData } from "@remix-run/react";
import { user } from "~/models/user.server";
import { company } from "~/models/company.server";

export const loader: LoaderFunction = async ({ request }) => {
  try {
    const session = await getSession(request);

    const userID = session.get(USER_SESSION_KEY);
    const tokens = JSON.parse(session.get(USER_TOKENS_KEY));

    if (await check(tokens.access_token)) {
      const userData = await user(tokens.access_token);
      const companyData = await company(tokens.access_token);

      return json({ user: userData, company: companyData });
    } else {
      return await logout(request);
    }
  } catch (e) {
    console.log(e);
    return await logout(request);
  }
};


export default function Index() {
  const data = useLoaderData();

  return (
    <div className="container mx-auto">
      <h1>Sample Admin Web APP</h1>
      <h2>Careful <strong>{data?.user?.name}</strong>&nbsp;<strong>{data?.company?.name}</strong></h2>
      <div className="flex justify-center">
        <div className="mb-3 w-96">
        </div>
      </div>
    </div>
  );
}
