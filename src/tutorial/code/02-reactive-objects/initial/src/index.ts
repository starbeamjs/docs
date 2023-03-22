import { reactive } from "@starbeam/js";

const hello = reactive.object({
  greeting: "Hello",
});

const output = document.querySelector("#currentCount")!;
output.innerHTML = hello.greeting;
