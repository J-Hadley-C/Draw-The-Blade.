<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: 'App\Repository\MessageRepository')]
#[ORM\Table(name: 'messages')]
#[ORM\HasLifecycleCallbacks]
class Message
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(['message:read'])]
    private ?int $id = null;

    #[ORM\Column(type: 'string', length: 100)]
    #[Groups(['message:read'])]
    private string $name;

    #[ORM\Column(type: 'string', length: 180)]
    #[Groups(['message:read'])]
    private string $email;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(['message:read'])]
    private string $subject;

    #[ORM\Column(type: 'text')]
    #[Groups(['message:read'])]
    private string $body;

    #[ORM\Column(type: 'boolean', options: ['default' => false])]
    #[Groups(['message:read'])]
    private bool $isRead = false;

    #[ORM\Column(type: 'datetime_immutable')]
    #[Groups(['message:read'])]
    private \DateTimeImmutable $createdAt;

    public function getId(): ?int { return $this->id; }

    public function getName(): string { return $this->name; }
    public function setName(string $name): self { $this->name = $name; return $this; }

    public function getEmail(): string { return $this->email; }
    public function setEmail(string $email): self { $this->email = $email; return $this; }

    public function getSubject(): string { return $this->subject; }
    public function setSubject(string $subject): self { $this->subject = $subject; return $this; }

    public function getBody(): string { return $this->body; }
    public function setBody(string $body): self { $this->body = $body; return $this; }

    public function isRead(): bool { return $this->isRead; }
    public function setIsRead(bool $isRead): self { $this->isRead = $isRead; return $this; }

    public function getCreatedAt(): \DateTimeImmutable { return $this->createdAt; }

    #[ORM\PrePersist]
    public function prePersist(): void
    {
        $this->createdAt ??= new \DateTimeImmutable();
    }
}
