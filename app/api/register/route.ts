import { hash } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const supabase = createClient();

    const { email, password, address } = (await req.json()) as {
      name: string;
      email: string;
      password: string;
      address: string;
    };
    const hashed_password = await hash(password, 12);

    // const user = await prisma.user.create({
    //   data: {
    //     email: email.toLowerCase(),
    //     password: hashed_password,
    //   },
    // });
    const { data: existingData, error: existingError } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();
    if (existingData) {
      return NextResponse.json({
        msg: "User already exist!",
      });
    } else {
      const password = hashed_password;
      const { data, error } = await supabase
        .from("users")
        .insert([{ email, address, password }]);
      if (error) {
        throw error;
      }

      if (error) {
        return NextResponse.json({
          msg: "Couldn't authenticate user",
        });
      }

      return NextResponse.json({
        msg: "Success",
      });
    }
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        status: "error",
        message: error.message,
      }),
      { status: 500 }
    );
  }
}
