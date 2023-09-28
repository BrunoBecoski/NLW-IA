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

    const responseTitle = await prisma.prompt.findFirst({
      where: {
        title,
      }
    })

    if(responseTitle) {
      return reply.status(409).send({ message: 'Title already exist.' })
    }

    const responseTemplate = await prisma.prompt.findFirst({
      where: {
        template,
      }
    })

    if(responseTemplate) {
      return reply.status(409).send({ message: 'Prompt already exist.' })
    }

    await prisma.prompt.create({
      data: {
        title,
        template
      }
    })
  
    return reply.status(201).send({ message: 'Prompt created successfully!' })
  })
}