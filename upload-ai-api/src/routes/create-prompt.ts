import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function createPrompt(app: FastifyInstance) {
  app.post('/prompt', async (req, reply) => {
    const bodySchema = z.object({
      title: z.string(),
      template: z.string(),
    })
    
    const { title, template } = bodySchema.parse(req.body)

    await prisma.prompt.create({
      data: {
        title,
        template
      }
    })
  
    return reply.status(201).send({ message: 'Prompt created successfully!' })
  })
}