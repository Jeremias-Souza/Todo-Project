"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

export type ItemProps = {
  title: string;
  description: string;
};

export default function Item({ title, description }: ItemProps) {
  return (
    <Card className="flex">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>{description}</CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
