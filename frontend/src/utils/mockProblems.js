export const problemsData = [
  {
    id: "two-sum",
    title: "Two Sum",
    difficulty: "Easy",
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    inputFormat: "nums = [2, 7, 11, 15], target = 9",
    outputFormat: "[0, 1]",
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "Only one valid answer exists."
    ],
    tags: ["Array", "Hash Table"]
  },
  {
    id: "longest-substring",
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    description: "Given a string s, find the length of the longest substring without repeating characters.",
    inputFormat: "s = 'abcabcbb'",
    outputFormat: "3",
    constraints: [
      "0 <= s.length <= 5 * 10^4",
      "s consists of English letters, digits, symbols and spaces."
    ],
    tags: ["Hash Table", "Sliding Window"]
  }
];
