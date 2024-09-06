import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { desc, eq } from "drizzle-orm";
import { scores } from "~/server/db/schema";

export const gameRouter = createTRPCRouter({
  submitScore: protectedProcedure
    .input(z.object({ score: z.number() }))
    .mutation(async ({ ctx, input }) => {
      try {
        if (!ctx.session || !ctx.session.user) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "You must be logged in to submit a score",
          });
        }
        const userId = ctx.session.user.id;
        const newScore = await ctx.db.insert(scores).values({
          score: input.score,
          userId: userId,
        }).returning();
        return { success: true, submittedScore: newScore[0].score };
      } catch (error) {
        console.error("Error submitting score:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An error occurred while submitting the score",
          cause: error,
        });
      }
    }),

  getLeaderboard: publicProcedure.query(async ({ ctx }) => {
    const leaderboard = await ctx.db.query.scores.findMany({
      orderBy: [desc(scores.score)],
      limit: 10,
      with: {
        user: {
          columns: {
            name: true,
          },
        },
      },
    });
    return leaderboard.map((entry) => ({
      id: entry.id,
      playerName: entry.user.name ?? "Anonymous",
      score: entry.score,
    }));
  }),
});